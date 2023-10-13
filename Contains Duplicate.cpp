class Solution {  
    public boolean containsDuplicate(int[] nums)
   {
        HashSet<Integer> s =new HashSet<>();
        for(int i=0;i<nums.length;i++){
            if(s.contains(nums[i]))
                return true;
            else s.add(nums[i]);
        }return false;
    } 
    
}
/*
71 / 71 test cases passed.
Status: Accepted
Runtime: 12 ms
Memory Usage: 56.1 MB
*/
