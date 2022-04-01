# Login-System

A simple login/register API with the objective of demonstrate some It-Security concepts. This projects does not prove any OAuth or JWT concepts (I might do later a project proving this concepts).

In this project, concepts related to passwords will be demonstrated, such as "Hashing", "Key stretching", "Salt" and "Peeper". Some of these concepts help prevent/delay bruteforcing and further damage in case the database is leaked.

## Concepts

> #### Hashing

Hashing is the process of converting a given key (for example, a password) to a totally different value that is unreadable. This conversion is done by using mathematical hashing algorithms like SHA-512.

Example using SHA-512:

    hash(PlainText)

    Plain text: ThisIsNowAPassword
    Hashed value: d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8

This hashed value is saved on the database and cannot be unhashed which means that it is impossible to know its original value unless by brute-forcing it.


> #### Key stretching

Key stretching is a technique that makes it more secure against brute-force attacks by increasing the resources it takes to test each key.
This concept, also known as multiple hashing, refers to the possibility of hashing the key several times with the objective of the hashing process to take longer. This is a very good idea, as long as you do it sufficiently many times.

Example using SHA-512:

    hash(... hash(PlainText) ...)

    Plain text: ThisIsNowAPassword
    Hashed value: d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8
    Value hashed 5 times: C54DD87E42B34252C894CBD96C93861812CD15B884A149090330DE87BF0A458A21A856383AC3E799E0596D915814B8F4A0B25DB69539315EFC36CD6B710B770A


> #### Salt

Salt is a random piece of data added to a key before it is hashed in order to increase the security of the stored data. It prevents equal keys from having the same hash output.  This random piece of data can not have any user data and must have no pattern and be different for each key to prevent hackers from finding the pattern and nullifying the "Salt". Finally, It has to be stored, so it is possible to verify later on if the keys match.

Example of Salt usage:

    Plain text: ThisIsNowAPassword
    Hashed value (no salt): d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8

    hash(PlainText + Salt)

    Example 1:
    Randomly generated salt: 3eeb9bed9148d82ea780534f59689356fe9
    Plain text: ThisIsNowAPassword + 3eeb9bed9148d82ea780534f59689356fe9 = ThisIsNowAPassword3eeb9bed9148d82ea780534f59689356fe9
    Hashed values: ec7113511cbdf82304492eb864b978cf52f9ab35b94292f1f87118a241299db47a3047e09e7cc3d8b3ceeccb86823f863e96207fa8543d0c1fe391de759eb73f

    Example 2:
    Randomly generated salt: 8191e8a8bb8b125020
    Plain text: ThisIsNowAPassword + 8191e8a8bb8b125020 = ThisIsNowAPassword8191e8a8bb8b125020
    Hashed values: 32603942af52bb8de9d223cf429571f6616dbed7db69a6c679b429d81522abc6fadafbee8a74668c6e63eb90132fcbe31b7bae762ea4bb87bff03af8a44a24f1


> #### Peeper
Peeper is very similar to Salt, in the way that it is also a random value that is added to the password before hashing. However, this random value will be the same for all the keys and must be kept secret. It can be hard-coded or saved in a file. It is very important to remember that this can not be changed overtime, otherwise keys will not match and the system will not work properly.

Example of Peeper usage:

    Plain text: ThisIsNowAPassword
    Hashed value (no peeper): d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8

    hash(PlainText + Peeper)

    Example 1:
    Peeper: ThisIsPeeeeeepeeer
    Plain text: ThisIsNowAPassword + ThisIsPeeeeeepeeer = ThisIsNowAPasswordThisIsPeeeeeepeeer
    Hashed values: d7842ba9a1b60a0fe7cfe9085b727f7196cb930aac55ca21beef3b436ad361577d46a2e5eea7c381e39dc9648ad96f9e03d611fde21b71611c3c8926c3f864f5

    Example 2:
    Peeper: ThisIsPeeeeeepeeer
    Plain text: ThisIsNowAPassword2 + ThisIsPeeeeeepeeer = ThisIsNowAPassword2ThisIsPeeeeeepeeer
    Hashed values: 6ed146eac7f9e625f9f6e7949386624d1320866bc0e566e362ac98e0ba08e0b78660e18394cc1aa9fb4b95a00afc103e15d4160b62f1b5b9ce7c210df0ce9d36

> #### Final
In conclusion, the usage of all these concepts are recommended to prevent hackers from having a easy access to important information.

Example of the usage of all these concepts: 

    Plain text: ThisIsNowAPassword
    Hashed value (no peeper): d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8

    Hash(... hash(PlainText + Salt + Peeper) ...)

    Example 1:
    Peeper: ThisIsPeeeeeepeeer
    Randomly generated salt: 3eeb9bed9148d82ea780534f59689356fe9
    Plain text: ThisIsNowAPassword + 3eeb9bed9148d82ea780534f59689356fe9 + ThisIsPeeeeeepeeer = ThisIsNowAPassword3eeb9bed9148d82ea780534f59689356fe9ThisIsPeeeeeepeeer
    Hashed values: 47596e3719f5a4fd8c48df22001cef5226926ea1489eef162819d8ba9b3ed6ebfa93ba9f67b28ead22827861e95874983d699e243f5ca4a6e2044dd4f6a4181b
    Value Hashed 5 times: ae26db156e3f67d4df26e3ea11cd22622b6878c9b6b2b9096913701a420d86994fef1f05942753b880a8209c4363f787eac49136f64719853380668166b4ca6e



