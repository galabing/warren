#!/usr/bin/python

""" Parses membership file for 1997/2003/2004/2005/2006.pdf (medium).
"""

import argparse
import re

def skip(line):
  PATTERNS = ('Ticker Name', 'Page \d+ of \d+')
  for pattern in PATTERNS:
    if re.search(pattern, line) is not None:
      return True
  return False

def clean_line(line):
  PATTERNS = ('Page \d+ of \d+', 'Russell 3000')
  for pattern in PATTERNS:
    m = re.search(pattern, line)
    if m is None:
      continue
    line = line[:m.start()].rstrip()
  return line

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--medium_file', required=True)
  parser.add_argument('--done_file', required=True)
  args = parser.parse_args()

  with open(args.medium_file, 'r') as fp:
    lines = fp.read().splitlines()
  members = []
  for line in lines:
    line = line.strip()
    if skip(line):
      continue
    line = clean_line(line)
    p = line.find(' ')
    ticker = line[:p]
    company = line[p+1:]
    members.append((ticker, company))

  with open(args.done_file, 'w') as fp:
    for member in members:
      print >> fp, '%s\t%s' % (member[0], member[1])

if __name__ == '__main__':
  main()

