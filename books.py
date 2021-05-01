import json
import re
import os
import sys
import numpy as np
import urllib

opener = urllib.URLopener()
myurl = "https://s3.amazonaws.com/skyl/fake.xyz"
myfile = opener.open(myurl)
