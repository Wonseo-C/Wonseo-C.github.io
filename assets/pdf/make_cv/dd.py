import itertools

arr =[8, 18, 5,15,18,11,15,9,7]
nCr = itertools.combinations(arr, 5)

# print(list(nCr))

for k in nCr:
    if (sum(k) == 60):
        print("-"*30)
        print(k)
        print(sum(k))

