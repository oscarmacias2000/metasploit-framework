
class Solution(object):
    def twoSum(self, n):
     result = 0
     for _ in range(32):
         result <<=1
         result |= (n & 1)
         n >>=1
     return result

newSolution = Solution()


print(newSolution.twoSum(43261596))   