#!/usr/bin/python

""" Parses membership file for 2006/2007.html (medium).
"""

from bs4 import BeautifulSoup
import argparse
import re

SPAN_STYLE = {
  '2006': 'font-size:11px;font-family:Times;color:#221f1f',
  '2007': 'font-size:11px;font-family:Times;color:#231f20',
}
SPLIT_FIRST_PAGE = {
  '2006': False,
  '2007': True,
}
LAST_TICKER = {
  '2006': 'ZOLL',
  '2007': 'ZGEN',
}

def parse_membership(html_file, span_style, split_first_page, last_ticker):
  with open(html_file, 'r') as fp:
    soup = BeautifulSoup(fp)

  spans = soup.find_all('span', style=span_style)
  print '%d pages' % len(spans)

  data = dict()
  found_last = False
  for i in range(len(spans)):
    if found_last:
      break

    divs = spans[i].find_all('div')
    if i == 0 and split_first_page:
      assert len(divs) == 1
      assert re.match('Page 1 of \d+', divs[0].text)
      continue
    p = i
    if not split_first_page:
      p += 1
    print 'parsing page %d' % p

    offset = 0
    if (not split_first_page) or (i > 1):
      assert len(divs) % 2 == 1
      assert re.match('Page %d of \d+' % p, divs[0].text)
      offset = 1
    for j in range(offset, len(divs), 2):
      ticker = divs[j].text.strip().upper()
      if ticker == last_ticker:
        found_last = True
        break
      company = divs[j+1].text.strip().upper().replace(u'\u2019', "'")
      assert ticker not in data
      data[ticker] = company

  return data

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--medium_file', required=True)
  parser.add_argument('--done_file', required=True)
  args = parser.parse_args()

  year = args.medium_file[
      args.medium_file.rfind('/')+1:args.medium_file.rfind('.')]
  assert year in SPAN_STYLE
  assert year in SPLIT_FIRST_PAGE
  assert year in LAST_TICKER

  data = parse_membership(
      args.medium_file, SPAN_STYLE[year], SPLIT_FIRST_PAGE[year],
      LAST_TICKER[year])
  with open(args.done_file, 'w') as fp:
    for ticker in sorted(data.keys()):
      company = data[ticker]
      print >> fp, '%s\t%s' % (ticker, company)

if __name__ == '__main__':
  main()

