#!/usr/bin/python

""" Collects historical changes to sp500 from the wiki page.
"""

from bs4 import BeautifulSoup
from datetime import datetime
from urllib import urlopen
import argparse

WIKI_URL = 'http://en.wikipedia.org/wiki/List_of_S&P_500_companies'

def parse_date(date_str):
  PATTERNS = ('%B %d, %Y', '%b %d, %Y', '%B %Y')
  date = None
  for pattern in PATTERNS:
    try:
      date = datetime.strptime(date_str, pattern).strftime('%Y-%m-%d')
      return date
    except ValueError:
      continue
  return date

def collect_changes():
  soup = BeautifulSoup(urlopen(WIKI_URL))
  tables = soup.find_all('table', class_='wikitable sortable')
  # There are two tables on the page, first one listing the current sp500
  # tickers, second listing the changes.
  assert len(tables) == 2
  rows = tables[1].findAll('tr')
  # First two rows:
  #      |       Added      |      Removed     |
  # Date | Ticker | Company | Ticker | Company | Reason
  assert len(rows) >= 2
  cells = rows[0].find_all('th')
  assert len(cells) == 2
  assert cells[0].text == u'Added'
  assert cells[1].text == u'Removed'
  cells = rows[1].find_all('td')
  assert len(cells) == 6
  assert cells[0].text == u'Date'
  assert cells[1].text == u'Ticker'
  assert cells[2].text == u'Company'
  assert cells[3].text == u'Ticker'
  assert cells[4].text == u'Company'
  assert cells[5].text == u'Reason'
  # Subsequent rows contain changes.
  changes = []
  current_date = None
  for i in range(2, len(rows)):
    cells = rows[i].find_all('td')
    if len(cells) == 6:
      current_date = parse_date(cells[0].text)
      assert current_date is not None
      offset = 1
    else:
      # Adjacent rows may share the same date and reason.
      assert len(cells) == 5 or len(cells) == 4
      assert current_date is not None
      offset = 0
    added_ticker = cells[offset].text.encode('ascii')
    added_company = cells[offset+1].text.encode('ascii')
    removed_ticker = cells[offset+2].text.encode('ascii')
    removed_company = cells[offset+3].text.encode('ascii')
    # We don't care about reasons for now.
    changes.append('%s\t+\t%s\t%s' %
                   (current_date, added_ticker, added_company))
    changes.append('%s\t-\t%s\t%s' %
                   (current_date, removed_ticker, removed_company))
  return changes

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--change_file', required=True)
  args = parser.parse_args()

  changes = collect_changes()
  with open(args.change_file, 'w') as fp:
    for change in sorted(changes, reverse=True):
      print >> fp, change

if __name__ == '__main__':
  main()

