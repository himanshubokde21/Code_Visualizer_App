import typing

d = 256

def Search(txt: str, pat: str, q: int) -> list:
    m = len(pat)
    n = len(text)
    p = (d**m) % q
    t = (d**n) % q
    i = 0
    j = 0
    h = (d**(m-1)) % q

    for i in range(m):
        p = (d*p + ord(pat[i])) % q
        t = (d*t + ord(txt[i])) % q
        
    for i in range(n-m+1):
        if p == t:
            for j in range(m):
                if txt[i+j] != pat[j]:
                    break
                else:
                    j += 1
            if j == m: 
                print("Pattern found at index " + str(i))

        if i < n-m: 
            t = (d*(t-ord(txt[i])*h) + ord(txt[i+m])) % q

            if t < 0:
                t = t + q

text = "CCACCADBA"
pat = "DBA"
q = 101
Search(text, pat, q)

