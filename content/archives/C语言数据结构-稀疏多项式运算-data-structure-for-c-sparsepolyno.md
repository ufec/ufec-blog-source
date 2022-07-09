---
title: C语言数据结构-稀疏多项式运算
date: 2021-05-08 10:28:41.0
updated: 2021-05-08 14:20:58.0
url: https://www.ufec.cn/archives/data-structure-for-c-sparsepolyno.html
featuredImage:
categories:
  - 数据结构
tags:
  - 数据结构
  - C语言
  - C语言数据结构
---

# 稀疏多项式运算

## 问题背景

稀疏多项式可以抽象成一个线性表，数据域存储指数和系数，指针域链接下一项，直到结束，操纵链表即可实现对多项式的运算！本文记录整个实现的过程，便于复查

## 开始

数据域和链表节点的定义

```c
// file: SingleList.h
/**
 * 定义数据域结构体
 */
typedef struct {
    int coe; // 系数
    int exp; // 指数
} ElemType;

/**
 * 定义链表节点结构体
 */
typedef struct LNode{
    ElemType data; // 数据域
    struct LNode *next; // 指针域
}LNode, *LinkList;

/**
 * 初始化链表
 * @param 节点的头指针
 */
void InitList(LinkList * L) {
    (* L) = (LNode *) malloc(sizeof (LNode)); // 分配一个头节点内存空间
    (* L)->next = NULL; // 定义头点指针域为空
}
```

> LinkList 与 LNode * 本质上等价 ，习惯用 LinkList 定义单链表，强调定义的是某个单链表的头指针，LNode *定义指向单链表中任意结点的指针变量

初始化过程

```C
// file main.c
ElemType data_A[] = {
    {1, 0},
    {2, 1},
    {-1, 3},
    {-3, 0},
    {-3, 2},
    {-2, 1},
    {3, 0},
    {3, 2}
};

ElemType data_B[] = {
    {-3,1},
    {4, 3},
    {1, 0},
    {3, 2},
    {5, 4},
    {-3, 2},
};
LinkList List_A, List_B; // 定义A，B两个链表头指针
// 初始化两个链表
InitList(&List_A);
InitList(&List_B);
// 计算数据域长度
int data_A_length = (sizeof(data_A))/(sizeof(data_A[0]));
int data_B_length = (sizeof(data_B))/(sizeof(data_B[0]));
```

创建链表

```c
// file: SingleList.h
/**
 * 头插法创建链表
 * @param L
 * @param e
 */
void CreateList_H(LinkList *L, ElemType e[], int length) {
    for (int i = 0; i < length; i++) {
        LNode *node = (LNode *) malloc(sizeof(LNode)); // 新建一个节点
        node->data = e[i]; // 数据域赋值
        node->next = (*L)->next; // 将头节点的指针域赋值给子节点node的指针域
        (*L)->next = node; // 将node节点的指针赋值给头节点的指针域
    }
}

// file : main.c
// 头插法创建链表
CreateList_H(&List_A, data_A, data_A_length);
CreateList_H(&List_B, data_B, data_B_length);
```

至此，我们已经创建好了两个“多项式”，接下来需要考虑如何操作。

> 注：在《数据结构：C 语言版》-严蔚敏著书中，创建链表时是输入一个创建一个，这个可以考虑到当前“多项式”有相同项的情况，本文直接使用数组创建，就要重新考虑去重、排序等问题

我们得到两个数据，用于生成链表，首当其冲应该考虑到重复项，如果使用数组去重，由于数组是静态的，无法对其长度增或减。本文采用先创建链表，再对链表去重

```C
// file: main.c
/**
 * 合并同类项
 * @param List
 * @return
 */
LinkList merge(LinkList List) {
    LinkList p = List->next; // p指向首元节点
    LinkList res; // 新建链表
    InitList(&res); // 初始化链表
    LinkList q = p->next; // q指向p的下一个节点
    int flag = 0; // 是否存在相同指数元素标志
    while (q){
        if(p->data.exp == q->data.exp){
            flag = 1; // 存在设为1
            p->data.coe += q->data.coe; // 系数求和
            if(p->data.coe != 0){
                Insert(&res, q->data); // 不为0保存下来
            }
        } else {
            Insert(&res, q->data); // 指数不相等保存下来
        }
        q = q->next; // 指针后移
    }
    free(q);
    if(flag == 1){
        return merge(res);
    }
    return List;
}

// file: SingleList.h
/**
 * 链表追加元素
 * @param L
 * @param e
 */
void Insert(LinkList *L, ElemType e){
    LNode *node = (LinkList) malloc(sizeof(LNode)); // 创建待插入的节点
    node->data = e;
    LinkList p = *L; //头节点
    if(p->next){
        LinkList q = p->next;
        LinkList r;
        while (q){
            r = q;
            q = q->next;
        }
        node->next = r->next;
        r->next = node;
    }else{
        node->next = p->next;
        p->next = node;
    }
}
```

我的思路如下：对一个链表进行去重，毫无疑问需要遍历他，我们首先保存他的首元结点（第一个“有用的”结点），因为链表是靠指针域连接的，拿到了其中某一个，就拿到了他后面所有的结点，这样就可以用第一个与他后面的每一个比较，指数相同则系数相加判断，但这里又出来一个问题，在自身操作会修改自身的值，这样一来第一趟遍历会多出指数不相等的，但后续不可能再回来了，就会导致相同节点越来越多。

于是我创建了一个新链表，用于保存指数不同，或者指数相同，但系数之和不为 0 的结点，这样第一趟下来，我们就得到了第一个结点去重后的结果，但处理完第一趟循环后，很明显后续结点都需要此操作，即需要递归处理，于是就需要找到递归出口，拿示例数据演示

```c
// 原数据
ElemType data_A[] = {
    {1, 0},
    {2, 1},
    {-1, 3},
    {-3, 0},
    {-3, 2},
    {-2, 1},
    {3, 0},
    {3, 2}
};
// 第一趟比较之后
res[] = {{3, 0},{-2, 1},{-3, 0},{-1, 3},{2, 1},{1, 0}}
```

此时 `p` 代表第一个结点 `{3, 2}`，`q`代表 `{3, 0},{-2, 1},{-3, 2},{-3, 0},{-1, 3},{2, 1},{1, 0}`，`{-3, 2}`这个结点指数与待合并的`{3, 2}`指数相同，会将`flag`值修改，从本质上，我们无法判断下一次比较是否还有与待合并结点指数相同的结点，因为每一次比较都以本次为条件去判断，但只要本次比较中有，我们就先认为下一趟也有，设置`flag`标志为 1，进行递归，并且递归之后`flag`在循环之前会被重新初始化，意味着我们只需要多牺牲一次无意义的循环即可准确判断递归出口，并且这次无意义的循环一定是最后一个结点，循环次数也不长

以上便可完成对多项式的合并，接下来进行排序。排序的意义在于，合并两多项式时，是选其中一个多项式作为结果，主要以指数大小关系来进行合并，指数杂乱无章，就会遗漏该合并的项，排序是为更简单的合并做铺垫。

排序参照网上的快速排序方法，代码实现如下：

```C
// file: main.c
/**
 * 找出最后一个节点
 * @param List
 * @return
 */
LNode *FindEnd(LinkList *List){
    LNode *End = *List;
    while (End->next) {
        End = End->next;
    }
    return End;
}

/**
 * 交换元素
 * @param a
 * @param b
 */
void swap(ElemType *a, ElemType *b)
{
    ElemType temp = *a;
    *a = *b;
    *b = temp;
}

/**
 * 快速排序操作
 * @param pBegin
 * @param pEnd
 */
void Partition(LNode * pBegin, LNode * pEnd){
    if(pBegin == NULL || pEnd == NULL || pBegin == pEnd){
        return;
    }else{
        //定义两个指针
        LNode* p1 = pBegin;
        LNode* p2 = pBegin->next;
        int pivot = pBegin->data.exp;

        while(p2 != NULL && p2 != pEnd->next){
            if(p2->data.exp < pivot){
                p1 = p1->next;
                if(p1 != p2){
                    swap(&p1->data, &p2->data);
                }
            }
            p2 = p2->next;
        }
        swap(&p1->data, &pBegin->data);
        //此时p1是中值节点

        if(p1->data.exp > pBegin->data.exp){
            Partition(pBegin, p1);
        }
        if(p1->data.exp < pEnd->data.exp){
            Partition(p1->next, pEnd);
        }
    }
}

/**
 * 排序方法
 * @param List
 */
void sortList(LinkList *List) {
    LNode *End = FindEnd(List);
    Partition(*List, End);
}
```

最终效果：
![datastructure_poly_1.png](https://my-static.ufec.cn/blog/c85388a337498df356b5007ea751f7be.png)

![datastructure_poly_2.png](https://my-static.ufec.cn/blog/cc8230330a51592970829ed77dbb2389.png)

## 总结

创建、操作链表，链表去重和排序，完整实现代码：[Gitee](https://gitee.com/ufec/data-structure-for-c)，没梯子了先上传到 Gitee 吧！
