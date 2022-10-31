#include<iostream>
#include<math.h>
using namespace std;

int main()
{
    int n;
    cin>>n;
    int sum=0;
    int on=n;

    while(n>0){
        int ld = n%10;
        sum += pow(ld,3);
        n=n/10; 
    }
    if (sum==on){
        cout<<"armstrong"<<endl;
    }
    else{
        cout<<"non-armstrong"<<endl;
    }
}