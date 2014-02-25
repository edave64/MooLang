(function () {
    module.exports = {
        object:     require('./object'    ),
        function:   require('./function'  ),
        nil:        require('./nil'       ),
        boolean:    require('./boolean'   ),
        comparable: require('./comparable'),
        number:     require('./number'    ),
        string:     require('./string'    ),
        array:      require('./array'     ),
        baseScope:  require('./baseScope' )
    }
}());
