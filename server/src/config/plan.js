const PLAN_LIMITS = {
    free: {
        monthlyUrlLimit: 10,
        lifetimeCustomLimit: 2
    },
    pro: {
        monthlyUrlLimit: 100,
        lifetimeCustomLimit: 20
    },
    enterprise: {
        monthlyUrlLimit: 1000,
        lifetimeCustomLimit: 200
    }
}

module.exports = {
    PLAN_LIMITS
}