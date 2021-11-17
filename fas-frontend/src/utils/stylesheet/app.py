


s = list(input())
ans = []
for i in range(0,len(s)-1,2):
    ans.append(max(s[i],s[i+1]))
if len(s)%2:
    ans.append(s[-1])
print(*ans, sep = "")
