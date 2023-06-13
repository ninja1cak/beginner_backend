# Beginner Backend
Pembuatan backend menggunakan framework express.js dengan database postgresql. Flow yang digunakan menggunakan prinsip Model-View-Controller (MVC)

## Task Revision Beginner Backend
Task yang sudah direvisi adalah sebagai berikut.
- mengganti error handler dari console.log menjadi return res.send
- mengganti POST query menjadi GET query
- mengganti req.body menjadi req.params (bagian DELETE) dan req.query (bagian QUERY data)
- kombinasi req.body dan req.params pada bagian update.

### Task Revision Intermediate Backend
Task yang sudah direvisi adalah sebagai berikut.
- Error pada controller create dan update di akibatkan model.readScheduleBy kehapus, jika di cek pada commit bagian **fixing model and ctrl booking** saya sudah tambahkan model.readByschedule, akan tetapi pada commit berikutnya yaitu **add total data in pagination schedule** model.readScheduleBy tidak sengaja saya hapus. Solusinya model.readScheduleBy sudah saya tambahkan kembali di model bagian schedule.
- menghapus console.log() setiap code