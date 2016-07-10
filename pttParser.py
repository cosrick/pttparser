#coding=utf8
import requests
from bs4 import BeautifulSoup
from Naked.toolshed.shell import execute_js

#get the Web page
res = requests.get('https://www.ptt.cc/bbs/Rent_apart/index.html')


Rick 	= "100000207901749"
Kelly	= "100001406078788"
Stanley = "100000143367147"
FonYu 	= "100004171322212"

soup = BeautifulSoup(res.text.encode('utf-8'), "html.parser")
choices = []

#get html element by className
for line in soup.select('.r-ent'):

	info 	= {}
	title 	= line.select('.title')[0].text.encode('utf-8').strip()
	date 	= line.select('.date')[0].text.encode('utf-8')

	#Just fetch the title which has 無, 北
	if '無' in title and '北' in title:
		if line.find_all('a'):
			ID = line.find_all('a')[0].get('href').encode('utf-8')

		info["title"] = title
		info["ID"] = ID
		choices.append(info)

#record seen information
filename = "seen.txt"
f = open(filename, 'r+')
seenPlace = f.readlines()

for choice in choices:
	#if the new info coming send fb message to us
	if choice not in seenPlace:
		executeScript = 'sendChat.js ' + Rick + " " + choice["title"] + " https://www.ptt.cc" + choice["ID"]
		success = execute_js(executeScript)
		f.write(choice["ID"] + '\n')
else:
	f.close()



	

	