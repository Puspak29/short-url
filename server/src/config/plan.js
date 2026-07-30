const PLAN_LIMITS = {
    free: {
        price: 0,
        monthlyUrlLimit: 10,
        lifetimeCustomLimit: 2
    },
    pro: {
        price: 89,
        monthlyUrlLimit: 100,
        lifetimeCustomLimit: 20
    },
    enterprise: {
        price: 299,
        monthlyUrlLimit: 1000,
        lifetimeCustomLimit: 200
    }
}

module.exports = {
    PLAN_LIMITS
}