#!/usr/bin/python

from urllib import urlopen
import argparse
import os
import re
import subprocess

WGET = '/usr/local/bin/wget'
RETRIES = 5

class DownloadStatusEnum(object):
  SUCCEEDED = 0
  CHANGED = 1
  FAILED = 2
  SKIPPED = 3

def download_ticker(ticker, data_dir, map_dir, overwrite):
  output_path = '%s/%s.csv' % (data_dir, ticker)
  if os.path.isfile(output_path):
    if not overwrite:
      return DownloadStatusEnum.SKIPPED
    os.remove(output_path)

  symbol = ticker.replace('.', '-')
  changed = None
  for i in range(RETRIES):
    # First try downloading the historical data file.
    url = ('http://ichart.finance.yahoo.com/table.csv?s=%s' % symbol)
    args = [WGET, '-q', '--timeout=60', url, '-O', output_path]
    if subprocess.call(args) == 0:
      assert os.path.isfile(output_path)
      if changed:
        return DownloadStatusEnum.CHANGED
      else:
        return DownloadStatusEnum.SUCCEEDED
    if os.path.isfile(output_path):
      os.remove(output_path)
    if changed is not None:
      continue
    # Try looking up symbol changes.
    try:
      content = urlopen('http://finance.yahoo.com/q?s=%s' % symbol).read()
    except IOError:
      continue
    p = content.find('%s is no longer valid.' % symbol)
    if p < 0:
      changed = False
      continue
    prefix = 'It has changed to <a href="/q?s='
    q = content.find(prefix, p)
    assert q > 0
    r = content.find('">', q)
    assert r > 0
    symbol2 = content[q+len(prefix):r]
    with open('%s/%s_%s' % (map_dir, symbol, symbol2), 'w') as fp:
      pass
    symbol = symbol2
    changed = True
  return DownloadStatusEnum.FAILED

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--ticker_file', required=True)
  parser.add_argument('--data_dir', required=True)
  parser.add_argument('--map_dir', required=True)
  parser.add_argument('--overwrite', action='store_true')
  args = parser.parse_args()

  with open(args.ticker_file, 'r') as fp:
    tickers = fp.read().splitlines()
  print 'processing %d tickers' % len(tickers)

  status_counts = {
    DownloadStatusEnum.SUCCEEDED: 0,
    DownloadStatusEnum.CHANGED: 0,
    DownloadStatusEnum.FAILED: 0,
    DownloadStatusEnum.SKIPPED: 0,
  }
  status_messages = {
    DownloadStatusEnum.SUCCEEDED: "succeeded",
    DownloadStatusEnum.CHANGED: "changed",
    DownloadStatusEnum.FAILED: "failed",
    DownloadStatusEnum.SKIPPED: "skipped",
  }
  for i in range(len(tickers)):
    print 'downloading %d/%d tickers: %s' % (i+1, len(tickers), tickers[i])
    status = download_ticker(
        tickers[i], args.data_dir, args.map_dir, args.overwrite)
    print '=> %s' % status_messages[status]
    status_counts[status] += 1

  print '%d succeeded, %d changed, %d failed, %d skipped' % (
      status_counts[DownloadStatusEnum.SUCCEEDED],
      status_counts[DownloadStatusEnum.CHANGED],
      status_counts[DownloadStatusEnum.FAILED],
      status_counts[DownloadStatusEnum.SKIPPED])

if __name__ == '__main__':
  main()

