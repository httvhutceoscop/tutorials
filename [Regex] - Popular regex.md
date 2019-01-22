## Strength password

```
^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$
```

## Hex color code

```
\#([a-fA-F]|[0-9]){3, 6}
```

## Valid email

```
/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
```

## IPv4 address

```
/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
```

## IPv6 address

```
(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))
```

## Thousand separator

```
/\d{1,3}(?=(\d{3})+(?!\d))/g
```

## Add http into anchor

```
if (!s.match(/^[a-zA-Z]+:\/\//))
{
    s = 'http://' + s;
}
```

## Domain regex

```
/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i
```

## Segment keywords by number of words in ga

```
^[^\s]*$        matches exactly 1-word keyword
^[^\s]*\s[^\s]*$    matches exactly 2-word keyword
^[^\s]*\s[^\s]*     matches keywords of at least 2 words (2 and more)
^([^\s]*\s){2}[^\s]*$    matches exactly 3-word keyword
^([^\s]*\s){4}[^\s]*$    matches 5-words-and-more keywords (longtail)
```

## Find valid base64 string in PHP file

```
\?php[ \t]eval\(base64_decode\(\'(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?){1}\'\)\)\;
```

## Valid phone number

```
^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$
```

## Leading and trailing whitespace

```
^[ \s]+|[ \s]+$
```

## Catch img src attribute in html

```
\< *[img][^\>]*[src] *= *[\"\']{0,1}([^\"\'\ >]*)
```

## Format date DD/MM/YYYY

```
^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$
```

## Youtube url matcher video id catcher

```
/https?:\/\/(?:youtu\.be\/|(?:[a-z]{2,3}\.)?youtube\.com\/watch(?:\?|#\!)v=)([\w-]{11}).*/gi
```

## Valid ISBN

```
/\b(?:ISBN(?:: ?| ))?((?:97[89])?\d{9}[\dx])\b/i
```

## Valid postcode

```
^\d{5}(?:[-\s]\d{4})?$
```

## Valid Twitter username

```
/@([A-Za-z0-9_]{1,15})/
```

## Card number

```
^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$
```

## Find CSS attributes

```
^\s*[a-zA-Z\-]+\s*[:]{1}\s[a-zA-Z0-9\s.#]+[;]{1}
```

## Remove HTML comment out

```
<!--(.*?)-->
```

## Facebook profile URL

```
/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
```

## Check IE version

```
^.*MSIE [5-8](?:\.[0-9]+)?(?!.*Trident\/[5-9]\.0).*$
```

## Get number from cost

```
/(\$[0-9,]+(\.[0-9]{2})?)/
```

## Analytic email subject

```
/\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i
```

## Match file specify type

```
/^(.*\.(?!(htm|html|class|js)$))?[^.]*$/i
```

## Match URL

```
/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
```

## Add rel="nofollow" into anchors

```
(<a\s*(?!.*\brel=)[^>]*)(href="https?://)((?!(?:(?:www\.)?'.implode('|(?:www\.)?', $follow_list).'))[^"]+)"((?!.*\brel=)[^>]*)(?:[^>]*)>
```

## Match media query

```
/@media([^{]+)\{([\s\S]+?})\s*}/g
```

## Google search syntax

```
/([+-]?(?:'.+?'|".+?"|[^+\- ]{1}[^ ]*))/g
```