module.exports = function (content) {
  this.cacheable && this.cacheable()
  this.value = content
  return 'module.exports=function(it, utils){ return `' + content + '` };'
}
