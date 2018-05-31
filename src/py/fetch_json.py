import json
import os
import time
from pprint import pprint


class ChroniconSkillData:
  def __init__(self, version, content):
    self.version = version
    self.content = content


def print_dates():
  print("Got files in APPDATA/Roaming directory...")
  for dump in dumps:
    print("File: {}".format(dump))
    print("\t - Created: {}".format(time.ctime(os.path.getctime(dump))))


path = os.getenv('APPDATA')
os.chdir(path + os.sep + ".." + os.sep + "Local")
debug = True

array = os.listdir(os.curdir)
if 'Chronicon' in array:
  os.chdir('Chronicon')
  array = os.listdir(os.curdir)
  dumps = [file for file in os.listdir(os.curdir) if file.startswith("skilldata")]
  if debug:
    print_dates()

  latest_file = max(dumps, key=os.path.getctime)
  if debug:
    print("Fetched latest file: {}".format(latest_file))

  with open(latest_file, 'r') as file:
    # expects the format to always have the version in the first line and the rest in separate lines.
    version, content = file.readlines()
    version = version.strip()
    content = json.loads(content)
    # save location is in py/../assets/skilldata
    script_folder = os.path.dirname(os.path.realpath(__file__))+os.sep+'..'+os.sep+'assets/skilldata'
    file_name = 'chronicon_{}.json'.format(version.replace('.', '_'))

    with open(script_folder+os.sep+file_name, 'w') as fp:
      json.dump({'version': version, 'tree': content}, fp)
