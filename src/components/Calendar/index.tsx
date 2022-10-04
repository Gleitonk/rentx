import { Calendar as CustomCalendar, LocaleConfig, DateCallbackHandler } from 'react-native-calendars';
import { generateinterval } from './generateInterval';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

type MarkedDateProps = {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disabledTouchableEvent?: boolean;
    }
}

type CalendarProps = {
    markedDates: MarkedDateProps;
    onDayPress: DateCallbackHandler;
}

type DayProps = {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;

}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
    const theme = useTheme();

    return (
        <CustomCalendar
            renderArrow={(direction) =>
                <Feather
                    name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                    size={24}
                    color={theme.colors.shape}
                />
            }

            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_details,
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontFamily: theme.fonts.secondary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={new Date().toString()}

            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
            
        />
    );
}

export {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateinterval
};