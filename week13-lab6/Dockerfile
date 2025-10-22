# Stage 1: Build application
FROM golang:1.24.5 AS builder

WORKDIR /app

# ดาวน์โหลด dependencies
COPY go.mod go.sum ./
RUN go mod download

# คัดลอก source code และ build application
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -o main .

# Stage 2: Final image
FROM alpine:latest

# curl และ ca-certificates สำหรับการเรียก API ภายนอก
RUN apk --no-cache add ca-certificates curl

WORKDIR /root

# คัดลอก binary file จาก builder stage
COPY --from=builder /app/main .
# คัดลอกไฟล์เอกสาร Swagger
COPY --from=builder /app/docs ./docs

ENTRYPOINT ["./main"]