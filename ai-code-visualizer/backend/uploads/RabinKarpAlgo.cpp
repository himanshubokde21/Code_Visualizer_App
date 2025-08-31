#include <iostream>

void rabinKarp(string text, string pat){
    int n=text.size, int m=pat.size;
    int p=0, t=0, h=1;
    int d=10, q=13;
    for (int i=0; i<m-1; i++){
        h = (d*h)%q;
    } 
}

int main(){
string text = "GEEKS FOR GEEKS";
string pat = "KS";
rabinKarp(text, pat) 
}