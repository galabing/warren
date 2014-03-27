#!/usr/bin/python

import argparse

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--raw_file', required=True)
  parser.add_argument('--ticker_file', required=True)
  args = parser.parse_args()

  with open(args.raw_file, 'r') as fp:
    lines = fp.read().splitlines()
  assert len(lines) > 0 and lines[0] == 'Constituent\tSymbol'
  tickers = []
  for i in range(1, len(lines)):
    c, s = lines[i].split('\t')
    tickers.append(s)
  print '%d tickers' % len(tickers)
  with open(args.ticker_file, 'w') as fp:
    for t in sorted(tickers):
      print >> fp, t

if __name__ == '__main__':
  main()

