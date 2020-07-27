function dryMatterFormulation(cowWeight, milkPerDayKg) {
    return 3.827 + (0.012 * cowWeight) + (0.268 * milkPerDayKg);
}

module.exports = dryMatterFormulation;