# 2019-04-11 What is package.json?

# Dịnh nghĩa
package.json là:

- 1 file json
- lưu tại thư mục gốc của project
- lưu trữ thông tin về ứng dụng, phiên bản
- cho biết cần phải cài các module dependencies nào trước khi chạy được project

# package.json sample
```json
{
  "name" : "Vote-sc-UIT",
  "description" : "Realtime Vote System base anonymous.",
  "homepage" : "http://project.lvduit.com/nodejs/vote-sc-uit/",
  "keywords" : ["vote", "realtime", "" "functional", "server", "client", "browser"],
  "author" : "Toi Lam IT <toilamitdotcom@gmail.com>",
  "contributors" : [],
  "dependencies" : {
        "async": "~0.9.0",
        "body-parser": "~1.5.2",
        "bower": "~1.3.8",
        "compression": "~1.0.9",
        "connect-flash": "~0.1.1",
        "connect-mongo": "~0.4.1",
        "consolidate": "~0.10.0",
        "cookie-parser": "~1.3.2",
        "cron": "^1.0.5",
        "express": "~4.7.2"
  },
  "main" : "app.js",
  "version" : "1.1.6"
}
```

# Giải thích các thành phần
## name
- bắt buộc
- tên project hoặc package
- nên viết hoa
- nó sẽ là package name nếu public project --> phải là duy nhất

## version
- theo cú pháp: **MAJOR.MINOR.PATCH** (Semantic Versioning)
    - MAJOR version when you make incompatible API changes
    - MINOR version when you add functionality in a backwards-compatible manner
    - PATCH version when you make backwards-compatible bug fixe
- Ví dụ:

```json
{
    "name" : "Vote-sc-UIT",
    "version" : "1.1.6"
}
```

## description
- mô tả cho project
- ngắn gọn dễ hiểu không hư cấu

## author
- Thông tin tác giả

## dependencies
- quan trọng
- liệt kê các package sẽ sử dụng trong project
- bao gồm cả version của package
- ví dụ

```json
"dependencies" : {
    "async": "*",
    "body-parser": "~1.5.2",
    "bower": "~1.3.8",
    "compression": "~1.0.9",
    "connect-flash": "~0.1.1",
    "connect-mongo": "~0.4.1",
    "consolidate": ">0.10.0",
    "cookie-parser": "~1.3.2",
    "cron": "^1.0.5",
    "express": "~4.7.2"
},
```

Để chạy cài đặt tự động dùng lệnh: `npm install`

# Giải thích các kí hiệu cho version
- `"*"` Nếu như này thì npm sẽ install cho bạn phiên bản mới nhất của package.
- `"~1.5.2"` dấu `~` cho quy định cho npm sẽ tìm tất cả các phiên bản có dạng 1.5.x (từ >=1.5.0 đến <1.6.0 )
- `"^1.0.5"` version từ 1.0.5 đến <1.1.0
- `">0.10.0"` version phải lớn hơn 0.10.0

# Refs
- https://docs.npmjs.com/files/package.json