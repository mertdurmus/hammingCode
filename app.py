#!flask/bin/python
from flask import Flask, jsonify
from flask import make_response
from flask import request
import requests as rs
import urllib
from bs4 import BeautifulSoup
from urllib.request import urlopen
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)

import binascii
import random

G = ['1101', '1011', '1000', '0111', '0100', '0010', '0001']
H = ['1010101', '0110011', '0001111']
Ht = ['100', '010', '110', '001', '101', '011', '111']
R = ['0010000', '0000100', '0000010', '0000001']

def decode_binary_string(s):
    byte_string = ''.join([str(x) for x in s])
    return byte_string    
         
def bits_to_keyword(bits):
    n = int(bits, 2)
    return n.to_bytes((n.bit_length() + 7) // 8, 'big').decode() or '\0'

def text_to_bits(text, encoding='utf-8', errors='surrogatepass'):
    bits = bin(int(binascii.hexlify(text.encode(encoding, errors)), 16))[2:]
    return bits.zfill(8 * ((len(bits) + 7) // 8))

def text_from_bits(bits, encoding='utf-8', errors='surrogatepass'):
    n = int(bits, 2)
    return int2bytes(n).decode(encoding, errors)

def int2bytes(i):
    hex_string = '%x' % i
    n = len(hex_string)
    return binascii.unhexlify(hex_string.zfill(n + (n & 1)))



list_codeword=[]
hatali_list_codeword=[]
list_hatali_index=[]
info=[]
l = ""
 
def mainx2(test_str):
    res = text_to_bits(test_str)
    #res2=text_from_bits(res) 
    #info binary dizinin dörder dörder bölünmüş hali
    inf = [res[i:i+4] for i in range(0, len(res), 4)]
    for i in range(0,len(inf)):
        info.append(inf[i])
        print(inf[i])
    #print ("info önce: ",info)

def bitboz(boz,e):
    boz = list(boz)
    boz[e - 1] = str(1 - int(boz[e - 1]))
    boz = ''.join(boz)
    return boz

def codeword(p):
    x = ''.join([str(bin(int(i, 2) & int(p, 2)).count('1') % 2) for i in G])
    print ('codeword: ' , x)
    list_codeword.append(x)
    return x

def funck(p):
    x=codeword(p)    
    e = random.randint(1, 7)
    x = bitboz(x,e)
    print ('hatali transfer edilen codeword: ' + x)   
    hatali_list_codeword.append(x)
    z = ''.join([str(bin(int(j, 2) & int(x, 2)).count('1') % 2) for j in H])
    if int(z, 2) > 0:
        e = int(Ht[int(z, 2) - 1], 2)
    else:
        e = 0
    print ('hatali bitin konumu: ' + str(e))
    list_hatali_index.append(e)
    if e > 0:
        x = list(x)
        x[e - 1] = str(1 - int(x[e - 1]))
        x = ''.join(x)    
    p = ''.join([str(bin(int(k, 2) & int(x, 2)).count('1') % 2) for k in R])    
    return p


def mainx():
    #ana çalışma
    k=""
    global l
    i=0
    while i <= int((len(info))-2):
        k=funck(info[i])+funck(info[(i+1)])
        l+=text_from_bits(k)
        print("karakter:" ,text_from_bits(k))
        print("----------------------------------------------")
        i=i+2
        
    print ("metin:",l)
    print("codeword'lerin listesi    : ",list_codeword)
    print("hatali codeword'ler       : ",hatali_list_codeword)
    print("hatali bitlerin indexleri : ",list_hatali_index)
    #ana çalışma son


@app.route('/api/sett', methods = ['POST'])
def setText():
    hatali_list_codeword[:]=[]
    list_codeword[:]=[]
    list_hatali_index[:]=[]
    info[:]=[]
    global l
    l=""
    content = request.json
    mainx2(content['name'])
    mainx()
    return jsonify(content)


@app.route('/api/gett', methods=['GET'])
@cross_origin() 
def get_hamming():
    return jsonify({'': hatali_list_codeword})

@app.route('/api/gett1', methods=['GET'])
@cross_origin()
def get_hamming2():
    return jsonify({'': list_codeword})

@app.route('/api/gett2', methods=['GET'])
@cross_origin()
def get_hamming3():
    return jsonify({"": list_hatali_index})




@app.route('/api/metin', methods=['GET'])
@cross_origin()
def get_hamming4():
    return jsonify({'': l})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'HTTP 404 Error': 'The content you looks for does not exist. Please check your request.'}), 404)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

 
if __name__ == '__main__':
    cors = CORS(app,resources={r"*": {"origins": "http://localhost:4200"}},allow_headers="*")
    # app.run(host='0.0.0.0',port=5000,ssl_context='adhoc')#app.run(debug=True)#!flask/bin/python

