#!/usr/bin/python

""" Parses membership file for 2008.html (raw).
"""

from bs4 import BeautifulSoup
import argparse

def parse_table(table):
  rows = table.find_all('tr')
  assert len(rows) > 1
  cells = rows[0].find_all('td')
  assert len(cells) == 7
  assert cells[0].text == u'Company'
  assert cells[1].text == u'\xa0'
  assert cells[2].text == u'Ticker'
  assert cells[3].text == u'\xa0'
  assert cells[4].text == u'Company'
  assert cells[5].text == u'\xa0'
  assert cells[6].text == u'Ticker'

  data = dict()
  for i in range(1, len(rows)):
    cells = rows[i].find_all('td')
    assert cells[1].text == u'\xa0'
    assert cells[3].text == u'\xa0'
    assert cells[5].text == u'\xa0'
    for j in (0, 4):
      company = cells[j].text.strip(u'\xa0')
      ticker = cells[j+2].text.strip(u'\xa0')
      assert (company == '') == (ticker == '')
      if company == '':
        continue
      company = company.encode('ascii')
      ticker = ticker.encode('ascii')
      assert ticker not in data
      data[ticker] = company

  return data

def parse_membership(html_file):
  with open(html_file, 'r') as fp:
    soup = BeautifulSoup(fp)
  tables = soup.find_all('table', class_='calloutTable')
  # There are 5 tables, but only the first one is visible on the page,
  # and it should be the one with the most complete data.
  assert len(tables) == 5

  data = parse_table(tables[0])
  for i in range(1, len(tables)):
    tmp = parse_table(tables[i])
    diff = set(tmp.keys()) - set(data.keys())
    if len(diff) > 0:
      print '!! table %d contains extra data (%d tickers)' % (i, len(diff))

  return data

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--raw_file', required=True)
  parser.add_argument('--done_file', required=True)
  args = parser.parse_args()

  data = parse_membership(args.raw_file)
  with open(args.done_file, 'w') as fp:
    for ticker in sorted(data.keys()):
      company = data[ticker]
      print >> fp, '%s\t%s' % (ticker, company)

if __name__ == '__main__':
  main()

