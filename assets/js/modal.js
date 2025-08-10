function modal_show(params) {
    modalManagerRef.value.modal_show(params);
}

function FakeLogUpdater($element) {
    const logLevels = ["INFO", "DEBUG", "WARN", "ERROR"];
    const components = [
        "AuthService", "DBConnector", "CacheManager", "LoadBalancer",
        "APIGateway", "UserService", "PaymentProcessor", "AnalyticsEngine",
        "DevOpsAgent", "NotificationService"
    ];

    const actions = [
        "initialized", "started", "terminated", "connected", "disconnected",
        "synchronized", "deployed", "rolled back", "cached", "invalidated",
        "retried", "failed", "executed", "compiled", "queried", "authenticated"
    ];

    const targets = [
        "user session", "database shard", "microservice", "endpoint",
        "cache key", "pipeline job", "token", "container", "load balancer",
        "environment variable", "webhook", "service mesh"
    ];

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    let promise = new Promise(function (resolve) {
        let startTime = Date.now();

        let interval = setInterval(() => {
            if (Date.now() - startTime >= 12000) {
                clearInterval(interval);
                resolve({
                    success: true,
                    message: "Proceso terminado correctamente"
                });
                return;
            }

            let timestamp = new Date().toLocaleTimeString();
            let level = getRandomItem(logLevels);
            let component = getRandomItem(components);
            let action = getRandomItem(actions);
            let target = getRandomItem(targets);

            let logLine = `[${timestamp}] [${level}] [${component}] ${action} ${target}.`;

            $element.textContent += logLine + "\n";
            $element.scrollTop = 99999
        }, 300);
    });

    promise = promise.finally(function () {
        terminate = true
    })

    return promise;
}