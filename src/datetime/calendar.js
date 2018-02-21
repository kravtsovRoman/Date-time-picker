import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { bindAll, range, chunk } from 'lodash';
import Day from './day';

export default class Calendar extends React.Component {

    static PropTypes = {
        moment: PropTypes.any.isRequired,
        className: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired

    };

    constructor(props) {
        super(props);

        bindAll(this, ['prevMonth', 'nextMonth', 'renderCells']);

        this.state = {
            m: this.props.moment
        }
    }

    prevMonth(event) {
        event.preventDefault();
        const { m } = this.state;
        m.subtract(1, 'month');
        this.setState({ m });
        this.props.onChange(m);
    }

    nextMonth(event) {
        event.preventDefault();
        const { m } = this.state;
        m.add(1, 'month');
        this.setState({ m });
        this.props.onChange(m);
    }

    renderCells(m) {
        const d = m.date();
        const d1 = m.clone().subtract(1, 'month').endOf('month').date();
        const d2 = m.clone().date(1).day();
        const d3 = m.clone().endOf('month').date();

        const days = [].concat(
            range(d1 - d2 + 1, d1 + 1),
            range(1, d3 + 1),
            range(1, 42 - d3 - d2 + 1)
        );

        return chunk(days, 7).map((row, w) => {
            return (
                <tr key={w}>
                    { row.map((i) => {
                        return (
                            <Day key={i} i={i} d={d} w={w} onClick={ this.selectDate.bind(this, i, w) } />
                        );
                    })}
                </tr>
            );
        });
    }

    selectDate(i, w) {
        const prevMonth = (w === 0 && i> 7);
        const nextMonth = (w >= 4 && i > 14);

        const { m } = this.state;

        m.date(i);

        this.setState({ m });

        if (prevMonth) m.subtract(1, 'month');
        if (nextMonth) m.add(1, 'month');

        this.props.onChange(m);
    }



    render() {

        const { m } = this.state;
        const wrapperClasses = classnames(this.props.className, 'tab-calendar');
        const weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        return (
            <div className={ wrapperClasses }>
                <div className='toolbar'>
                    <button className='prev-month' onClick={this.prevMonth}>&#8656;</button>
                    <span className={'current-date'}>{ m.format('MMMM YYYY') }</span>
                    <button className='next-month' onClick={this.nextMonth}>&#8658;</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            { weeks.map((w, i) => <td key={i}>{ w }</td>) }
                        </tr>
                    </thead>
                    <tbody>
                    { this.renderCells(m) }
                    </tbody>
                </table>
            </div>
        );
    }
}
