# Beginner Backend
Pembuatan backend menggunakan framework express.js dengan database postgresql. Flow yang digunakan menggunakan prinsip Model-View-Controller (MVC)

## Task Revision
Task yang sudah direvisi adalah sebagai berikut.
- mengganti error handler dari console.log menjadi return res.send
- mengganti POST query menjadi GET query
- mengganti req.body menjadi req.params (bagian DELETE) dan req.query (bagian QUERY data)
- kombinasi req.body dan req.params pada bagian update.

## Problem/Trouble
Problem/trouble yang belum di fix.
- saat menggunakan db transaction pada tabel movie, commit harus dimasukkan sebelum database insert genre movie. Jika commit di masukkan setelah insert genre movie, terjadi error id movie tidak ditemukan dalam database ketika query insert value genre.
