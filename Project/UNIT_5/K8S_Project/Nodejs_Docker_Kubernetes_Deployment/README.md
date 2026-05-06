# Node.js Docker Kubernetes Deployment - Commands

## 1. Initialize Node.js App

```bash
npm init -y
npm install express
```

---

## 2. Dockerize the Node.js App

Create a `Dockerfile`:

- `FROM node:14-alpine` — Uses a lightweight Node.js image.
- `WORKDIR` — Sets the working directory inside the container.
- `COPY package*.json` — Copies dependency files first (optimizes caching).
- `RUN npm install` — Installs dependencies.
- `COPY . .` — Copies the rest of the app code.
- `EXPOSE 3000` — Declares the container's exposed port.
- `CMD` — Defines the command to run the app.

### Create `.dockerignore`

```
node_modules
npm-debug.log
```

---

## 3. Build & Run Docker Image

```bash
# Build Docker image
docker build -t node-k8s-demo .

# Run it locally
docker run -p 3000:3000 -d node-k8s-demo
```

- `-p 3000:3000` — Maps host port 3000 to container port 3000.
- `-d` — Runs in detached mode (background).
- Verify at http://localhost:3000

> Docker packages the app and its environment for consistency. The layered build process optimizes caching (faster rebuilds). `.dockerignore` improves efficiency by excluding unnecessary files.

---

## 4. Push Image to Docker Hub

```bash
docker login -u <your-email>

docker tag node-k8s-demo mitul002/node-k8s-demo:1.0
docker push mitul002/node-k8s-demo:1.0
```

> Docker Hub acts as a central repository for container images. Kubernetes will pull the image from here during deployment.

---

## 5. Install & Start Minikube

- [Minikube Installation Guide](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Farm64%2Fstable%2Fhomebrew)

```bash
minikube start
```

Creates a local Kubernetes cluster for testing.

---

## 6. Create Kubernetes YAML Files

```bash
# Generate deployment.yaml (then modify as needed)
kubectl create deployment node-k8s-demo --image=mitul002/node-k8s-demo:1.0 --dry-run=client -o yaml > deployment.yaml

# Generate service.yaml (then modify as needed)
kubectl expose deployment node-k8s-demo --port=80 --target-port=3000 --type=LoadBalancer --dry-run=client -o yaml > service.yaml
```

- `--dry-run=client` — Prevents actual deployment.
- `-o yaml` — Outputs in YAML format.

---

## 7. Apply Kubernetes Configs

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

> ✅ Store `deployment.yaml` and `service.yaml` in the project root or a `k8s/` folder.

---

## 8. Verification Steps

```bash
kubectl get all
kubectl get deployments
kubectl get pods
kubectl get services
kubectl logs <pod-name>
```

---

## 9. Access the App

```bash
minikube service node-k8s-demo-service --url
```

---

## 10. Troubleshooting

```bash
kubectl describe deployment node-k8s-demo    # Check docker image name
kubectl describe service node-k8s-demo-service
```

---

## 11. Cleanup & Re-deploy

```bash
# Delete everything
kubectl delete deployment node-k8s-demo
kubectl delete service node-k8s-demo-service
kubectl delete -f deployment.yaml -f service.yaml

# Re-deploy
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Watch pod creation
kubectl get pods -w

kubectl get endpoints node-k8s-demo-service
```
