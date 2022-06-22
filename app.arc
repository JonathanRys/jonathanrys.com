@app
jonathanrys-com-ce6c

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

appointment
  pk *String  # userId
  sk **String # appointmentId

@aws
region us-east-1
profile default
