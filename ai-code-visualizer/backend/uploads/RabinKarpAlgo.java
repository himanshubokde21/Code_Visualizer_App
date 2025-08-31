import java.util.*;

class RabinkarpAlgo{
    public static final int d = 10;

    static void search(String text, String pat){
        int q = 13;
        int t=0, p=0;
        int n = text.length(), m = pat.length();
        int h = 1;
        for (int i=0; i<m-1; i++){
            h = (d*h)%q;
        }
        for (int i=0; i<m; i++){
            t = (d*t + text.charAt(i)) % q;
            p = (d*p + pat.charAt(i)) % q;
        }
        for (int i=0; i<n-m+1; i++){
            if (p==t){
                boolean match = true;
                for (int j=0;j<m;j++){
                    if (text.charAt(i+j) != pat.charAt(j)){
                        match = false;
                        break;
                    }
                }
                if (match){
                    System.out.println("Pattern found at "+ i);
                }
            }
            if (i<n-m){
                t =(d*(t-text.charAt(i)*h) + (text.charAt(i+m)))%q;
                if (t<0){
                    t+=q;
                }
            }
        }
    }
    public static void main(String[] args) {
        String text = "GEEKS FOR GEEKS";
        String pat = "G";
        search(text, pat);
    }

    
}
