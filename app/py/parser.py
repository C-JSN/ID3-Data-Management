import re
from main import fileName
import data
import csv
import json

def isfloat(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

def readCsvFile(fileName):
    csvFilePointer = open(fileName, 'rb')
    dataStream = csv.reader(csvFilePointer)
    headers = dataStream.next()
    datas = []
    for row in dataStream:
        data = {}
        for h, v in zip(headers, row):
            if isfloat(v):
                v = float(v)
            data[h] = v
        datas.append(data)
    return datas

def readJsonFile(fileName):
    with open(fileName) as data_file:
        datas = json.dumps(json.loads(data_file.read()))
    return datas

storage = fileName
print(storage)
