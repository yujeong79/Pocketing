#!/bin/bash

UPSTREAM_CONF="/etc/nginx/conf.d/upstream.conf" 
BACKUP_CONF="/etc/nginx/conf.d/upstream.conf.bak" 

# 현재 설정 백업
# 설정 실패 시 rollback 하기 위함
sudo cp $UPSTREAM_CONF $BACKUP_CONF

# 현재 활성화된 포트 확인
ACTIVE_PORT=$(grep -E '^\s*server backend_(blue|green):8080;' $UPSTREAM_CONF | grep -o 'backend_\(blue\|green\)' | head -n1)

# 새로운 설정 생성 및 전환
if [ "$ACTIVE_PORT" == "backend_blue" ]; then
    NEW_CONFIG="upstream app_servers {
        # server backend_blue:8080; # 블루 서버 비활성화
        server backend_green:8080; # 그린 서버 활성화
    }"
elif [ "$ACTIVE_PORT" == "backend_green" ]; then
    NEW_CONFIG="upstream app_servers {
        server backend_blue:8080; # 블루 서버 활성화
        # server backend_green:8080; # 그린 서버 비활성화
    }"
else # 기본값으로 블루 서버를 활성화
    NEW_CONFIG="upstream app_servers {
        server backend_blue:8080; # 블루 서버 활성화
        # server backend_green:8080; # 그린 서버 비활성화
    }"
fi

# 새로운 설정을 파일에 쓰기
echo "$NEW_CONFIG" | sudo tee $UPSTREAM_CONF

# Nginx 설정 테스트 및 적용
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "Nginx 업스트림 서버 전환 성공: 활성 포트 $ACTIVE_PORT에서 전환됨."
else
    # 설정 오류 시 백업 파일 복원
    sudo cp $BACKUP_CONF $UPSTREAM_CONF
    sudo systemctl reload nginx
    echo "Nginx 설정 테스트 실패: 백업 파일을 복원합니다."
    exit 1
fi