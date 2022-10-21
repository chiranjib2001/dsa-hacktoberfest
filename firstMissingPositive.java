class Solution {
    public int firstMissingPositive(int[] nums) {
        int k=1;
        int count=0;
        Arrays.sort(nums);
        for(int i=0;i<nums.length;i++){
            if(nums[i]==k){
                k++;
                count=1;
            }
        }
        
        return k;
    }
}
