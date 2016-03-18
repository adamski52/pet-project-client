#!/home/jon/jonathanadamski.com/bin/python3
import sys, os
os.environ.setdefault('PATH', '/bin:/usr/bin')
os.environ['PATH'] = '/home/jon/jonathanadamski.com/bin:' + os.environ['PATH']
os.environ['VIRTUAL_ENV'] = '/home/jon/jonathanadamski.com/bin'
os.environ['PYTHON_EGG_CACHE'] = '/home/jon/jonathanadamski.com/bin'
os.chdir('/home/jon/public_html/storybook')
#os.chdir('/home/jon/jonathanadamski.com/pet-project')

sys.path.insert(0, '/home/jon/jonathanadamski.com/pet-project')
#sys.path.insert(0, '/home/jon/public_html/storybook')
os.environ['DJANGO_SETTINGS_MODULE'] = 'storybook.settings'

from django.core.servers.fastcgi import runfastcgi
runfastcgi(method='threaded', daemonize='false')

