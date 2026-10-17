
if [ ! -f .env ]; then
  cp .env.example .env
  
  SED_ACCESS=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  SED_REFRESH=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  
  sed -i "s/JWT_ACCESS_SECRET=/JWT_ACCESS_SECRET=$SED_ACCESS/g" .env
  sed -i "s/JWT_REFRESH_SECRET=/JWT_REFRESH_SECRET=$SED_REFRESH/g" .env
  
  echo "Файл .env успешно создан с уникальными крипто-ключами!"
else
  echo "Файл .env уже существует, пропускаем генерацию ключей."
fi
