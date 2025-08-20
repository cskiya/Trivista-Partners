
const definePlan = (e)=>{
    var nextActive = $(e).closest('.percWrapper').find('.active-icon')[0]
    $(nextActive).removeClass('fa-dot-circle-o')
    $(nextActive).removeClass('active-icon')
    $(nextActive).removeClass('site-yellow')
    $(nextActive).addClass('greyWhite2')
    $(nextActive).addClass('fa-circle-o')

    nowActive = $(e).find('i')[0]
    $(nowActive).removeClass('greyWhite2')
    $(nowActive).removeClass('fa-circle-o')

    $(nowActive).addClass('fa-dot-circle-o')
    $(nowActive).addClass('active-icon')
    $(nowActive).addClass('site-yellow')
    
    // set Range
    minAmountDiv = $(e).closest('.planWrapper').find('.min_amount')[0]
    maxAmountDiv = $(e).closest('.planWrapper').find('.max_amount')[0]

    minAmount = $(e).find('input')[0]
    minAmountValue = minAmount.value

    maxAmount = $(e).find('input')[1]
    maxAmountValue = maxAmount.value
    // 
    $(minAmountDiv).html(minAmountValue)
    $(maxAmountDiv).html(maxAmountValue)
    // 
    investLink = $(e).closest('.planWrapper').find('.invest-link')[0]
    $(investLink).prop('href', '/invest/' + e.id)
}

