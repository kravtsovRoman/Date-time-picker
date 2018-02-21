import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Day extends React.Component {

    static propTypes = {
        i: PropTypes.number.isRequired,
        w: PropTypes.number.isRequired,
        d: PropTypes.number.isRequired
    };

    constructor(props) {
            super(props);
    }

    render() {
        const { i, d, w } = this.state;
        const prevMonth = (w === 0 && i> 7);
        const nextMonth = (w >= 4 && i > 14);

        const wrapperClasses = classnames({
            'prevMonth': prevMonth,
            'nextMonth': nextMonth,
            'current-day': !prevMonth && !nextMonth && (i === d),
            'disabled': (prevMonth || nextMonth)
        });


        return (
            <td className={ wrapperClasses } {...this.props}>
                { i }
            </td>
        );
    }
}
