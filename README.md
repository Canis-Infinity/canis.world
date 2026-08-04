# Canis World

`frontend` 是 `https://canis.world` 的人型犬日常主站。它使用 Next.js、TypeScript、Tailwind v4、Shadcn Base UI、next-themes、nextjs-toploader 與 lucide-react。

## 本機啟動

Docker Compose 會先執行 production build，再將服務啟動在 `7654`，不需要 Dockerfile：

```powershell
docker compose up -d --force-recreate
```

本機網址：

```txt
http://localhost:7654
```

預設後端位址：

```txt
http://host.docker.internal:7344
```

需要覆蓋時設定：

```dotenv
INTERNAL_API_BASE_URL=http://host.docker.internal:7344
```

## 開發指令

```powershell
npm run lint
npm run build
```

## 資料來源

前台會讀取 backend 的 `/api/canis-world`。Dashboard 透過 `/canis-world` 管理今日狀態、角色介紹、日常紀錄與圖片。
