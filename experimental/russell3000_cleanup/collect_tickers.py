#!/usr/bin/python

import argparse

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--done_dir', required=True)
  parser.add_argument('--bases', required=True)
  parser.add_argument('--ticker_file', required=True)
  args = parser.parse_args()

  bases = args.bases.split(',')
  print 'collecting tickers from %s with base names: %s' % (
      args.done_dir, bases)

  tickers = set()
  for base in bases:
    with open('%s/%s.txt' % (args.done_dir, base), 'r') as fp:
      lines = fp.read().splitlines()
    for line in lines:
      ticker, company = line.split('\t')
      tickers.add(ticker)
  print '%d tickers' % len(tickers)

  with open(args.ticker_file, 'w') as fp:
    for ticker in sorted(tickers):
      print >> fp, ticker

if __name__ == '__main__':
  main()

