var textToChain = TristText.textToChain;
var factory = function (levels) {
    var words = "zero one two three four five six seven eight nine ten".split(' ');
    return levels.split('')
        .map(function (strLevel) { return parseInt(strLevel); })
        .map(function (level) { return _.repeat(' ', level) + words[level]; })
        .join('\n');
};
var dump = function (chain) {
    var numberOrDash = function (n) { return _.isNumber(n) ? n.toString() : '-'; };
    var stringOrDash = function (s) { return _.isString(s) ? s : '-'; };
    var cops = Trist.chainOps(chain);
    var head = cops.head();
    return {
        rlevels: cops.rlevels(head).map(function (rlevel) { return numberOrDash(rlevel); }).join(''),
        PVs: cops.pvids(head).map(function (pvid) { return stringOrDash(pvid); }).join(''),
        NVs: cops.nvids(head).map(function (nvid) { return stringOrDash(nvid); }).join(''),
    };
};
describe('collapseEmAll tests', function () {
    it('tests the main test case for collapseEmAll', function () {
        var text = factory('1133221100');
        var chain = textToChain(text, function (index) { return index.toString(); });
        var result = dump(chain);
        expect(result.rlevels).toEqual('1020-1000-10');
        expect(result.PVs).toEqual('-0-2341678');
    });
});
//# sourceMappingURL=test.spec.js.map