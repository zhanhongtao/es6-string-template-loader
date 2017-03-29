module.exports = function (content) {
  this.cacheable && this.cacheable()
  this.value = content
  var string = '`' + content + '`'
  return 'module.exports=function(it, tag, utils){ return typeof tag === \'function\' ? tag ' + string + ' : ' + string + ' };'
}
