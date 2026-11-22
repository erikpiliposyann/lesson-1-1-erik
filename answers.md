## Part A — Knowledge Check

### 1. What was the C10k problem, and why was it difficult for traditional web servers?

C10k խնդիրը այն է, երբ սերվերը պետք է միաժամանակ 10 000 client սպասարկի։ Apache-ի նման սերվերները ամեն client-ի համար առանձին thread են բացում։ Այդ thread-երը blocking են երբ մեկը ֆայլ է կարդում, նա կանգնում է և սպասում է, մինչև ֆայլը կարդացվի, ուստի մյուս client-ների համար նոր thread-եր են պետք։ 10 000 thread-ը շատ հիշողություն է ուտում և դանդաղեցնում է համակարգը, մինչդեռ դրանց մեծ մասը պարզապես սպասում է։

### 2. Who is Ryan Dahl, and what problem inspired him to create Node.js?

Node.js-ը ստեղծել է ամերիկացի ծրագրավորող Ryan Dahl-ը 2009 թվականին։ Նա ուշադրություն դարձրեց Flickr-ի progress bar-ին browser-ը ստիպված էր անընդհատ սերվերին հարցնել, թե ֆայլը որքանով է վերբեռնվել, քանի որ սերվերը չէր կարողանում ինքնուրույն տեղեկացնել առաջընթացի մասին։ Դա նրան հասկացրեց, որ սերվերները պետք է աշխատեն non-blocking և event-driven ձևով  առանց սպասելու և event-ներին արձագանքելով։

### 3. Why did Ryan Dahl choose Google's V8 engine?

Node.js-ը օգտագործում է Google-ի V8 շարժիչը, որը ստեղծվել է Chrome-ի համար 2008 թվականին։ Dahl-ը այն ընտրեց, քանի որ V8-ը շատ արագ էր , open source էր, ուստի Dahl-ին պետք չէր սեփական JavaScript շարժիչ գրել։

### 4. What is npm, and when was it introduced?

npm-ը (Node Package Manager) Node.js-ի փաթեթների կառավարիչն է, որը ստեղծվել է 2010 թվականին։ Այն թույլ է տալիս մեկ հրամանով տեղադրել ուրիշ ծրագրավորողների պատրաստի փաթեթները և օգտագործել այն առանց ամեն ինչ զրոյից գրելու։

### 5. How did Node.js change the relationship between frontend and backend development?

Մինչև Node.js-ը frontend-ը և backend-ը երկու առանձին աշխարհ էին frontend-ը գրվում էր JavaScript-ով և աշխատում էր բրաուզերում, իսկ backend-ը այլ լեզուներով : Node.js-ը JavaScript-ը բերեց սերվեր, ուստի հիմա երկու կողմերը կարելի է գրել նույն լեզվով։ Դրա շնորհիվ առաջացավ full-stack JavaScript developer-ի դերը:

### 6. What is the purpose of the `lib/` directory in the Node.js repository?

`lib/` թղթապանակը Node.js-ի JavaScript շերտն է  , այն պարունակում է այն մոդուլները, որոնք անմիջապես օգտագործում ենք, օրինակ՝ `fs.js`, `http.js`, `net.js`, `stream.js`, `events.js`, `crypto.js` և `path.js`։ Օրինակ՝ `lib/fs.js`-ը ստանում է փոխանցված տվյալները, կատարում է անհրաժեշտ ստուգումները և հետո `internalBinding`-ի միջոցով կանչում է `src/`-ի C++ կոդը։ Այս թղթապանակը հիմնականում գրված է JavaScript-ով։

### 7. What is the purpose of the `src/` directory?

`src/` թղթապանակը Node.js-ի հիմնական շարժիչն է, որը գրված է C++-ով։ Երբ գործարկվում է `node`-ը, աշխատում է հենց այս կոդը։ Այն իրականացնում է binding-ները, որոնք կամուրջ են `lib/`-ի JavaScript-ի և  միացնում է V8-ը և libuv-ը։ Օրինակ՝ `src/node_file.cc`-ը `fs` մոդուլի հետևում կանգնած C++ կոդն է երբ `lib/fs.js`-ը կանչում է `internalBinding('fs')`, հենց այս ֆայլն է կատարում իրական աշխատանքը։

### 8. What is the purpose of the `deps/` directory?

`deps/` թղթապանակը պարունակում է երրորդ կողմի գրադարանները, որոնց վրա Node.js-ը հիմնված է և որոնք նա չի գրել ինքը։ Օրինակ՝ V8-ը JavaScript-ը կատարելու համար, libuv-ը event loop-ի և non-blocking I/O-ի համար, OpenSSL-ը գաղտնագրության: Դրանք հիմնականում գրված են C և C++ լեզուներով։

### 9. What is libuv, and what does it do?

libuv-ը C լեզվով գրված գրադարան է, որը գտնվում է `deps/`-ում և համարվում է Node.js-ի միջուկը։ Այն ապահովում է event loop-ը, non-blocking I/O-ն և ֆայլային համակարգի գործողությունները, ինչպես նաև thread pool-ը այն գործողությունների համար, որոնք չեն կարող ասինխրոն լինել։

### 10. Describe the simplified execution path of `fs.readFile()` in Node.js. What are Deno and non-blocking I/O?

Երբ կանչում եմ `fs.readFile('text.txt')`, `lib/fs.js`-ը նախ ստուգում է արգումենտները, հետո `internalBinding('fs')`-ով փոխանցում է C++ կոդին (`src/`)։ Այնտեղից այն գնում է libuv-ին, որը ֆայլը կարդալու գործը տալիս է thread pool-ի որևէ thread-ի, որ main thread-ը չկանգնի։

Deno-ն ստեղծել է նույն Ryan Dahl-ը, որովհետև Node.js-ում շատ բանի համար էր ափսոսում, օրինակ՝ անվտանգության համար. Node-ը ֆայլերին և ցանցին հասանելի է առանց թույլտվության։ Deno-ում դրա համար permissions կան։

Non-blocking I/O նշանակում է, որ ծրագիրը չի սպասում երկար գործողության ավարտին, այլ անցնում է մյուս գործին, իսկ արդյունքը գալիս է հետո։ Օրինակ՝ սրճարանում պատվիրում ես, նստում ես, և երբ սուրճը պատրաստ է, քեզ կանչում են։

## B1 — Environment Setup

- Node.js: v26.13.1
- npm: 11.20.0
- nvm: v26.13.1 (active)
- V8: 14.6.202.34-node.40

Screenshot: `setup.png`

## B2 — Node.js Global Objects

| Global Value | Node.js (`typeof`) | Browser (`typeof`) |
|---|---|---|
| `globalThis` | object | object |
| `window` | undefined | object |
| `document` | undefined | object |
| `process` | object | undefined |
| `console` | object | object |
| `setTimeout` | function | function |

## B3 — Environment Report

| Parameter | Output |
|---|---|
| Node.js Version | v26.13.1 |
| V8 Version | 14.6.202.34-node.40 |
| libuv Version | 1.52.1 |
| OpenSSL Version | 3.5.9 |
| llhttp Version | 9.4.4 |
| zlib Version | 1.3.2.1-motley-456ae73 |
| Platform | darwin |
| Architecture | arm64 |
| PID | 78759 |
| CWD | /Users/erikpiliposyan/Desktop/lesson-1-1-erik |
| Uptime | 0.075609792 seconds |
| Heap Used | 4.83 MB |

### Dependencies Location (`deps/`)

Source: [Node.js GitHub — deps directory](https://github.com/nodejs/node/tree/main/deps)

| Library | Directory |
|---|---|
| V8 | `deps/v8/` |
| libuv | `deps/uv/` |
| OpenSSL | `deps/openssl/` |
| llhttp | `deps/llhttp/` |
| zlib | `deps/zlib/` |

## B4 — Node.js GitHub Repository Exploration

### 1. internalBinding('fs')-ը `lib/fs.js` ֆայլում

`internalBinding('fs')`-ը Node.js-ի ներքին մեխանիզմ է, որը թույլ է տալիս JavaScript կոդին հասանելիություն ստանալ ֆայլային համակարգի հետ կապված ներքին ֆունկցիոնալությանը։ Այն կապում է `lib/fs.js`-ի JavaScript իրականացումը Node.js-ի ներքին native (C++) իրականացումների հետ։

### 2. `src/node_file.cc` ֆայլի դերը

`src/node_file.cc`-ը Node.js-ի C++ կոդով գրված ֆայլ է, որը պարունակում է File System-ի հետ կապված native իրականացումները։ Այն ապահովում է կապը JavaScript API-ների և օպերացիոն համակարգի, ֆայլային համակարգի հնարավորությունների միջև։

### 3. `deps/` պանակի 5 ենթապանակները և դրանց նշանակությունը

`deps/` պանակը պարունակում է Node.js-ի կողմից օգտագործվող արտաքին գրադարանները և dependencies-ները։

| Directory | Նշանակություն |
|---|---|
| `deps/v8/` | JavaScript Engine է, որը կատարում է JavaScript կոդը։ |
| `deps/uv/` | libuv գրադարանն է, որը կառավարում է asynchronous I/O գործողությունները և Event Loop-ը։ |
| `deps/openssl/` | Ապահովում է գաղտնագրման և TLS/SSL ֆունկցիոնալությունը։ |
| `deps/llhttp/` | Օգտագործվում է HTTP հաղորդագրությունների parsing-ի համար։ |
| `deps/zlib/` | Ապահովում է տվյալների Compression և Decompression հնարավորությունները։ |

### 4. `lib/` պանակի 5 JavaScript module

`lib/` պանակը պարունակում է Node.js-ի ներքին JavaScript մոդուլները, որոնք տրամադրում են տարբեր ֆունկցիոնալություններ։

| Module | Նշանակություն |
|---|---|
| `fs.js` | File-երի և directory-ների հետ աշխատանք։ |
| `path.js` | File-երի և directory-ների path-երի մշակում։ |
| `http.js` | HTTP սերվերների և հարցումների հետ աշխատանք։ |
| `os.js` | Օպերացիոն համակարգի մասին տեղեկությունների ստացում։ |
| `crypto.js` | Կրիպտոգրաֆիկ գործողություններ՝ hash և encryption։ |


## Part C — Event Loop

### C1 — Predict the Output

1. `console.log('A')` — սինխրոն է, անմիջապես տպվում է։
2. `setTimeout(..., 0)` — callback-ը տրվում է timer-ին, հետո կմտնի timer queue:։
3. `Promise.resolve().then(...)` — callback-ը մտնում է microtask queue։
4. `console.log('D')` — սինխրոն է, անմիջապես տպվում է։
5. Call stack-ը դատարկվելուց հետո կատարվում է microtask-ը՝ տպվում է `C`։
6. Վերջում կատարվում է timer callback-ը՝ տպվում է `B`։

0 ms-ը նշանակում է որքան հնարավոր է շուտ, ոչ թե հենց հիմա։

### C2 — Blocking the Event Loop

**Արդյունք.**

```
Busy loop finished
Timer fired after 2000 ms (I asked for 100 ms)
```

Timer-ը աշխատում է ոչ թե 100 ms-ից հետո, այլ մոտ 2000 ms-ից հետո, երբ busy loop-ն ավարտվում է։ Node.js-ը JavaScript կոդը կատարում է մեկ main thread-ով։ Քանի դեռ սինխրոն ցիկլը աշխատում է, call stack-ը զբաղված է, և event loop-ը չի կարող անցնել timer queue-ին։ 100 ms-ը միայն նվազագույն սպասումն է, ոչ թե երաշխավորված ժամանակը callback-ը կաշխատի միայն այն ժամանակ, երբ thread-ը ազատվի։ Եթե սերվերի մեջ կա 2 վայրկյան տևող blocking գործողություն, այդ ընթացքում սերվերը չի կարող սպասարկել ոչ մի այլ client-ի. նրանց բոլոր հարցումները սպասում են queue-ում։ Հենց դրա համար է Node.js-ը կառուցված non-blocking I/O-ի վրա. երբ պետք է ֆայլ կարդալ կամ տվյալների բազայից սպասել, այն այդ գործը հանձնում է libuv-ին և անցնում է հաջորդին, որպեսզի մեկ thread-ը կարողանա միաժամանակ սպասարկել շատ օգտատերերի։ Դրա համար Node.js-ում երկար գործողությունները պետք է լինեն asynchronous (non-blocking)։

## Bonus — Ryan Dahl's Regrets

1. **Promises-ը չպահեց.** Dahl-ը Promises-ը ավելացրել էր 2009-ի, բայց հանեց, և ինքն էլ դա անվանեց հիմար որոշում։ Արդյունքում Node-ի ասինխրոն API-ները մնացին callback-ների վրա, իսկ Promises-ը անհրաժեշտ է async/await-ի համար։ Նրա կարծիքով, եթե Promises-ը միասնական օգտագործվեին, async/await-ի ստանդարտացումը հնարավոր է արագ լիներ։
2. **Անվտանգություն.** Node.js ծրագիրը կարող է առանց որևէ թույլտվության կարդալ ֆայլեր, գրել դրանք և օգտագործել ցանցը։ Օրինակ՝ քո linter-ը չպետք է լիարժեք հասանելիություն ունենա քո համակարգչին և ցանցին։
3. **`node_modules`.** Երբ գրում ենք `require('express')`, Node-ը ճշգրիտ ուղի չգիտի և ստիպված է փնտրել `node_modules` պանակներում՝ մեկ առ մեկ բարձրանալով վերև, մինչև գտնի։ Սա բարդացնում է մոդուլների որոնման ալգորիթմը։ Բրաուզերում և Deno-ում import-ը ուղիղ նշում է ուղին կամ URL-ը, ուստի այդպիսի փնտրտուք պետք չէ։

### Իմ կարծիքը՝ անվտանգության մասին

Ես համաձայն եմ Dahl-ի հետ, որ սա լուրջ խնդիր է։ Երբ տեղադրում ես npm փաթեթ, դու վստահում ես ոչ միայն դրա հեղինակին, այլ նաև այն բոլոր փաթեթներին, որոնցից այն կախված է։ Եթե նրանցից մեկը վնասակար է, այն կարող է կարդալ քո ֆայլերը կամ ուղարկել տվյալներ ինտերնետով, և Node.js-ը չի կանգնեցնի դա։ Deno-ն այս խնդիրը լուծում է permissions համակարգով. ծրագիրը ֆայլերին կամ ցանցին հասանելիություն ստանում է միայն այն դեպքում, երբ դու այն ուղղակիորեն թույլ ես տալիս։ Իմ կարծիքով սա ավելի ճիշտ մոտեցում է, թեև ավելի անհարմար է, որովհետև ստիպված ես ամեն անգամ թույլտվություններ նշել։