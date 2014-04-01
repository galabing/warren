#!/usr/bin/python

import argparse
import os
import re
import subprocess

WGET = '/usr/local/bin/wget'
WGET_RETRIES = 5
CORRUPTION_RETRIES = 3

COLUMNS = 5

NO_DATA = 'No financial data available from this page.'
TABLE_PREFIX = ("<table border='0' bgColor='ffffff' cellspacing='1'"
                " cellpadding='2' width='705'  align='left' >")
TABLE_SUFFIX = '</table>'

SELECT_PREFIX = "<select id='istart_dateid' name='istart_date'"
SELECT_SUFFIX = '</select>'
# Eg,
#     <option  value='0' selected>2001/12</option>
#     <option  value='1'>2002/12</option>
SELECT_DATE_PATTERN = ("<option\s+value='(?P<value>\d+)'(|\s+selected)>"
                       "\d{4}/\d{2}</option>")
SELECT_DATE_PROG = re.compile(SELECT_DATE_PATTERN)

class PageStatusEnum(object):
  OK = 0
  FAILED = 1
  CORRUPTED = 2
  NO_DATA = 3
  NO_TABLE = 4
  NO_SELECTION = 5

PAGE_STATUS_MESSAGES = {
  PageStatusEnum.OK: 'page content is okay',
  PageStatusEnum.CORRUPTED: 'page is corrupted',
  PageStatusEnum.NO_DATA: 'page contains no data',
  PageStatusEnum.NO_TABLE: 'page contains no table',
  PageStatusEnum.NO_SELECTION: 'page contains no selection',
}

def download(ticker, symbol, start, output_dir, overwrite):
  output_path = '%s/%s-%d.html' % (output_dir, ticker, start)
  if os.path.isfile(output_path):
    if not overwrite:
      print '! file exists and not overwritable: %s' % output_path
      return output_path
    os.remove(output_path)
  url = ('http://ih.advfn.com/p.php?pid=financials'
         '&btn=quarterly_reports&symbol=%s&istart_date=%d' % (symbol, start))
  args = [WGET, '-q', url, '-O', output_path]
  for i in range(WGET_RETRIES):
    if subprocess.call(args) == 0:
      return output_path
    if os.path.isfile(output_path):
      os.remove(output_path)
  return None

def get_page_count(page_path):
  with open(page_path, 'r') as fp:
    content = fp.read()
  if not content.endswith('</html>\n'):
    return 0, PageStatusEnum.CORRUPTED
  if content.find(NO_DATA) >= 0:
    return 0, PageStatusEnum.NO_DATA
  p = content.find(TABLE_PREFIX)
  q = content.find(TABLE_SUFFIX, p)
  if p < 0 or q < p:
    return 0, PageStatusEnum.NO_TABLE
  p = content.find(SELECT_PREFIX)
  q = content.find(SELECT_SUFFIX, p)
  if p < 0 or q < p:
    return 0, PageStatusEnum.NO_SELECTION
  # TODO: more content checks?

  hits = SELECT_DATE_PROG.findall(content[p:q])
  return max([int(hit[0]) for hit in hits]) + 1, PageStatusEnum.OK

def download_and_get_page_count(ticker, symbol, start, output_dir, overwrite):
  for i in range(CORRUPTION_RETRIES):
    page_path = download(ticker, symbol, start, output_dir, overwrite)
    if page_path is None:
      return 0, PageStatusEnum.FAILED
    page_count, status = get_page_count(page_path)
    if status != PageStatusEnum.CORRUPTED:
      if status != PageStatusEnum.OK and os.path.isfile(page_path):
        os.remove(page_path)
      return page_count, status
    if os.path.isfile(page_path):
      os.remove(page_path)
  return 0, PageStatusEnum.CORRUPTED

def download_ticker(ticker, symbol, output_dir, overwrite):
  page_count, status = download_and_get_page_count(
      ticker, symbol, 0, output_dir, overwrite)
  if status != PageStatusEnum.OK:
    print '!! failed to download/process first page: %s' % ticker
    return False
  print '%s: %d pages of reports' % (ticker, page_count)

  for start in range(COLUMNS, page_count, COLUMNS):
    print 'downloading %s: %d' % (ticker, start)
    tmp, status = download_and_get_page_count(
        ticker, symbol, start, output_dir, overwrite)
    assert status == PageStatusEnum.OK
    assert tmp == page_count
  return True

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--ticker_file', required=True)
  parser.add_argument('--map_dir')
  parser.add_argument('--output_dir', required=True)
  parser.add_argument('--overwrite', action='store_true')
  args = parser.parse_args()

  with open(args.ticker_file, 'r') as fp:
    tickers = fp.read().splitlines()
  print 'processing %d tickers' % len(tickers)

  changed = dict()
  if args.map_dir:
    map_files = os.listdir(args.map_dir)
    for map_file in map_files:
      symbol1, symbol2 = map_file.split('_')
      ticker1 = symbol1.replace('-', '.')
      ticker2 = symbol2.replace('-', '.')
      assert ticker1 not in changed
      changed[ticker1] = ticker2

  for i in range(len(tickers)):
    ticker = tickers[i]
    print 'processing %d/%d tickers: %s' % (i+1, len(tickers), ticker)

    output_dir = '%s/%s' % (args.output_dir, ticker)
    if not os.path.isdir(output_dir):
      os.mkdir(output_dir)

    if (not download_ticker(ticker, ticker, output_dir, args.overwrite) and
        ticker in changed):
      print '=> trying changed ticker: %s => %s' % (ticker, changed[ticker])
      ok = download_ticker(ticker, changed[ticker], output_dir, args.overwrite)
      print '<= ok ?', ok

if __name__ == '__main__':
  main()

