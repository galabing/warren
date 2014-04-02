#!/usr/bin/python

import argparse
import os

START_STEP = 5
DELIMITER = '\t'
DATE_HEADER = 'quarter end date'

def get_suffix(line):
  count = 0
  while line[-1-count] == DELIMITER: count += 1
  return line[len(line)-count:]

def merge(input_dir, ticker, output_path):
  output_lines = None
  last_file = False
  start = 0
  while True:
    input_path = '%s/%s-%d.csv' % (input_dir, ticker, start)
    if not os.path.isfile(input_path): break
    else: assert not last_file

    with open(input_path, 'r') as fp:
      lines = fp.read().splitlines()

    assert len(lines) > 0
    assert lines[0].startswith('%s%s' % (DATE_HEADER, DELIMITER))
    suffix = get_suffix(lines[0])
    if len(suffix) > 0:
      last_file = True
    for i in range(len(lines)):
      lines[i] = lines[i][:len(lines[i])-len(suffix)]

    # Process the first file.
    if output_lines is None:
      output_lines = lines
    # Process the rest of the files.
    else:
      assert len(lines) == len(output_lines)
      for i in range(len(lines)):
        prefix = lines[i][:lines[i].find(DELIMITER)]
        assert output_lines[i].startswith(prefix)
        output_lines[i] = '%s%s%s' % (
            output_lines[i], DELIMITER, lines[i][len(prefix)+len(DELIMITER):])

    start += START_STEP

  if output_lines is None:
    print 'no input file in %s' % input_dir
    return

  # Sanity check.
  items = output_lines[0].split(DELIMITER)
  assert all([items[i] < items[i+1] for i in range(1, len(items)-1)])
  for i in range(1, len(output_lines)):
    assert len(output_lines[i].split(DELIMITER)) == len(items)

  with open(output_path, 'w') as fp:
    for line in output_lines:
      print >> fp, line

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--ticker_file', required=True)
  parser.add_argument('--input_dir', required=True)
  parser.add_argument('--output_dir', required=True)
  parser.add_argument('--overwrite', action='store_true')
  args = parser.parse_args()

  with open(args.ticker_file, 'r') as fp:
    tickers = fp.read().splitlines()
  print 'processing %d tickers' % len(tickers)

  for i in range(len(tickers)):
    ticker = tickers[i]
    print 'processing %d/%d tickers: %s' % (i+1, len(tickers), ticker)

    input_dir = '%s/%s' % (args.input_dir, ticker)
    if not os.path.isdir(input_dir):
      print 'input dir does not exist: ' % input_dir
      continue

    output_path = '%s/%s.csv' % (args.output_dir, ticker)
    if os.path.isfile(output_path) and not args.overwrite:
      print 'output file exists and not overwritable: %s' % output_path
      continue

    merge(input_dir, ticker, output_path)

if __name__ == '__main__':
  main()

