#!/usr/bin/python

""" Parses membership file for 2009/2010/2011/2012/2013.pdf (medium).
"""

import argparse

def skip(line):
  CONTENTS = ('', '\xc2\xa0', 'Company Ticker')
  for content in CONTENTS:
    if line == content:
      return True
  return False

def clean_line(line):
  if not line.endswith('Russell Indexes.'):
    return line
  PATTERNS = ('As of ', 'As\xc2\xa0of ')
  for pattern in PATTERNS:
    p = line.find(pattern)
    if p > 0:
      return line[:p].rstrip()
  return None

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
    assert line is not None
    p = line.rfind(' ')
    company = line[:p]
    ticker = line[p+1:]
    members.append((ticker, company))

  with open(args.done_file, 'w') as fp:
    for member in members:
      print >> fp, '%s\t%s' % (member[0], member[1])

if __name__ == '__main__':
  main()

