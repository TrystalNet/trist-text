var TristText;
(function (TristText) {
    var fnLeaderLen = function (leader) { return leader.replace(/\t/g, "    ").length; };
    var fnMatchToSplit = function (id, leader, trystup) { return ({ id: id, leader: leader, trystup: trystup }); };
    var fnSplitOne = function (str, idFactory, index) {
        var id = idFactory(index);
        var _a = str.match(/^(\s*)(.*$)/), leader = _a[1], trystup = _a[2];
        return fnMatchToSplit(id, leader, trystup);
    };
    var fnLevelKeys = function (leaders) { return _.uniq(leaders).sort(function (a, b) { return fnLeaderLen(a) - fnLeaderLen(b); }); };
    var fnLevels = function (splitted, levelKeys) { return splitted.reduce(function (accum, item) {
        var id = item.id, leader = item.leader;
        accum[id] = levelKeys.indexOf(leader);
        return accum;
    }, {}); };
    function textToChain(text, fnNextId) {
        var strs = text.split(/[\r\n]+/).filter(function (str) { return str.length; });
        var splitted = _.map(strs, function (str, index) { return fnSplitOne(str, fnNextId, index); });
        var levelKeys = fnLevelKeys(splitted.map(function (item) { return item.leader; })); // ["", "  ", "    "]
        var levels = fnLevels(splitted, levelKeys); // [1,0,...]
        var payloads = splitted.map(function (_a) {
            var id = _a.id, trystup = _a.trystup;
            return ({ id: id, trystup: trystup });
        }); // [{id,trystup},{id,trystup},...]
        var chain = Trist.chainify(payloads, function (id) { return levels[id]; }); // [{id,next,prev,NV,PV,rlevel},{...},...]
        return Trist.collapseAll(chain, function (id) { return levels[id]; }); // {N1:{id,prev,next,PV,NV,rlevel},N2:{...},...}
    }
    TristText.textToChain = textToChain;
})(TristText || (TristText = {}));
//# sourceMappingURL=trist-text.js.map