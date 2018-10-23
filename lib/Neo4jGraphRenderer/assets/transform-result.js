"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var transformResult = exports.transformResult = function transformResult(res) {
  var cols = res.results[0].columns;
  var rows = res.results[0].data.map(function (row) {
    var r = {};
    cols.forEach(function (col, index) {
      r[col] = row.row[index];
    });
    return r;
  });
  var nodes = [];
  var relations = [];
  var labels = [];

  res.results[0].data.forEach(function (row) {
    row.graph.nodes.forEach(function (n) {
      var found = nodes.filter(function (m) {
        return m.id === n.id;
      }).length > 0;
      if (!found) {
        for (var p in n.properties || {}) {
          n[p] = n.properties[p];
          delete n.properties[p];
        }
        delete n.properties;
        nodes.push(n);
        labels = labels.concat(n.labels.filter(function (l) {
          return labels.indexOf(l) === -1;
        }));
      }
    });
    relations = relations.concat(row.graph.relationships.map(function (r) {
      return { id: r.id, start: r.startNode, end: r.endNode, type: r.type };
    }));
  });
  return { table: rows, graph: { nodes: nodes, links: relations }, labels: labels };
};

exports.default = { transformResult: transformResult };