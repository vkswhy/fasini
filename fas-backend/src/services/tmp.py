def solve(string, pat):
    n, m = len(string), len(pat)
    ans = ""
    for i in range(n):
        j = i
        k = 0
        while j < n and k < m and (pat[k] == "#" or string[j] == pat[k]):
            j+=1
            k+=1
        if k==m:
            ans += str(i+1)
    return ans
print(solve("abcdefg","##"))