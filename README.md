# Login-System

A simple login/register API with the objective of demonstrate some It-Security concepts. This projects does not prove any OAuth or JWT concepts (I might do later a project proving this concepts).

In this project, concepts related to passwords will be demonstrated, such as "Hashing", "Key stretching", "Salt" and "Peeper". Some of these concepts help prevent/delay bruteforcing and further damage in case the database is leaked.

## Concepts

> #### Hashing

Hashing is the process of converting a given key (for example, a password) to a totally different value that is unreadable. This convertion is done by using mathematical hashing algorithms like SHA-512.

Example using SHA-512:

    Plain text: ThisIsNowAPassword
    Hashed value: d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8

This hashed value is saved on the database and cannot be unhashed which means that it is impossible to know its original value unless by bruteforcing it.

> #### Key stretching

Key stretching is a technique that makes it more secure against brute-force attacks by increasing the resources it takes to test each key.
This concept, also known as multiple hashing, refers to the possibility of hashing the key several times with the objective of the hashing process to take longer. This is a very good idea, as long as you do it sufficiently many times.

Example using SHA-512:

    Plain text: ThisIsNowAPassword
    Hashed value: d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8
    Value hashed 5 times: C54DD87E42B34252C894CBD96C93861812CD15B884A149090330DE87BF0A458A21A856383AC3E799E0596D915814B8F4A0B25DB69539315EFC36CD6B710B770A

> #### Salt

Salt is a random piece of data added to a key before it is hashed in order to increase the security of the stored data. It prevents equal keys from having the same hash output.  This random piece of data can not have any user data and must have no pattern and be different for each key to prevent hackers from finding the pattern and nullifying the "Salt". Finally, It has to be stored, so it is possible to verify later on if the keys match.

Example of Salt Usage:

    Plain text: ThisIsNowAPassword
    Hashed value (no salt): d393f49203106342ba64025ca8959737cc96e596ade79909cd8b74c6816170c8172d3422d114cfe8c528e9f934800db43c0c19c423227a5ca516de5f230d27a8
    Hashed value (with salt): C54DD87E42B34252C894CBD96C93861812CD15B884A149090330DE87BF0A458A21A856383AC3E799E0596D915814B8F4A0B25DB69539315EFC36CD6B710B770A

> #### Peeper

